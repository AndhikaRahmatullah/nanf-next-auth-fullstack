import { NextResponse } from 'next/server';
import * as z from 'zod';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';

// --------------------------------------------------------------------------------------

interface PayloadCreateUser {
  email: string;
  username: string;
  password: string;
}

// --------------------------------------------------------------------------------------

export async function GET() {
  return NextResponse.json({ success: true });
}

const userSchema = z.object({
  username: z.string().min(1, 'Username is required.').max(100),
  email: z.string().min(1, 'Email is required.').email(),
  password: z.string().min(1, 'Password is required.').min(6, 'Password must have than 6 characters.'),
  // confirmPassword: z.string().min(1, 'Password confirmation is required.'),
});
// .refine((data) => data.password === data.confirmPassword, {
//   path: ['confirmPassword'],
//   message: 'Password do not match.',
// });

export async function POST(req: Request) {
  try {
    const body: PayloadCreateUser = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserEmail) {
      return NextResponse.json(
        {
          message: 'User with this email already exists.',
          status: false,
        },
        { status: 409 },
      );
    }

    const existingUserUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserUsername) {
      return NextResponse.json(
        {
          message: 'User with this username already exists.',
          status: false,
        },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const createUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: pass, ...others } = createUser;

    const response = {
      message: 'User created successfully.',
      status: false,
      data: others,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response = {
      message: 'Something went wrong.',
      status: false,
    };

    return NextResponse.json(response, { status: 500 });
  }
}

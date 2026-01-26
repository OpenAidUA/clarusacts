import { NextResponse } from 'next/server';
// import { getSessionUser } from '@/shared/auth';
import { CreateActRequestSchema } from '@/modules/acts/domain';
import { createAct } from '@/modules/acts/service';

export async function POST(req: Request) {
  try {
    // const user = await getSessionUser();
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await req.json();
    const parsed = CreateActRequestSchema.parse(body);

    const act = await createAct('122', parsed);

    return NextResponse.json({
      id: act.id,
      status: act.status,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: err.errors },
        { status: 400 },
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

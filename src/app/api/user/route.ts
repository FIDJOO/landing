import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  // Validate auth
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Fetch Fidjoo user
  const { data: fidjooUser, error: dbError } = await supabase
    .from('users')
    .select('id, auth_id, revenuecat_app_user_id, email, first_name, last_name, subscription_status, language, created_at')
    .eq('auth_id', user.id)
    .single();

  if (dbError) {
    if (dbError.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'User not found. Please sign up in the Fidjoo app first.' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }

  return NextResponse.json({ user: fidjooUser });
}

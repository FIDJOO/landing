import { getBlogPost } from '@/data/blog';
import { isValidLocale, Locale } from '@/i18n/config';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const siteUrl = 'https://fidjoo.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const blog = searchParams.get('blog') || 'false';
  const slug = searchParams.get('slug') || '';
  const langParam = searchParams.get('lang') || 'en';
  const locale: Locale = isValidLocale(langParam) ? langParam : 'en';

  if (blog === 'true' && slug) {
    const post = getBlogPost(slug, locale);

    if (post) {
      // Load Baloo 2 font for blog OG image
      const baloo2Bold = await fetch(
        'https://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgazapv9Fat7WcN.ttf'
      ).then((res) => res.arrayBuffer());

      const coverImageUrl = post.coverImage
        ? `${siteUrl}${post.coverImage}`
        : `${siteUrl}/images/mascotte/blue/blue.png`;

      const title = post.ogTitle || post.title;

      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              position: 'relative',
            }}
          >
            {/* Background cover image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImageUrl}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Dark gradient overlay for text readability */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
              }}
            />

            {/* Content container */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '40px 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              {/* Fidjoo branding */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: 'Baloo 2',
                    color: '#49AAFF',
                  }}
                >
                  Fidjoo
                </span>
                <span
                  style={{
                    fontSize: 24,
                    fontFamily: 'Baloo 2',
                    color: '#ffffff',
                    opacity: 0.8,
                  }}
                >
                  Blog
                </span>
              </div>

              {/* Blog post title */}
              <h1
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  fontFamily: 'Baloo 2',
                  color: '#ffffff',
                  lineHeight: 1.15,
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {title}
              </h1>

              {/* Read time badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontFamily: 'Baloo 2',
                    color: '#ffb71c',
                    fontWeight: 700,
                  }}
                >
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Top color bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: 'linear-gradient(90deg, #49AAFF 0%, #8DD1FF 50%, #ffb71c 100%)',
              }}
            />
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Baloo 2',
              data: baloo2Bold,
              weight: 700,
              style: 'normal',
            },
          ],
        }
      );
    }
  }

  // Dynamic params (with defaults)
  const title = searchParams.get('title') || 'Meaningful Screen Time Through Creative Storymaking';
  const description = searchParams.get('description') || 'Transform screen time into creativity with animated storybooks';

  // Load Baloo 2 font from Google Fonts
  const baloo2Bold = await fetch(
    'https://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgazapv9Fat7WcN.ttf'
  ).then((res) => res.arrayBuffer());

  const baloo2Regular = await fetch(
    'https://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgozapv9Fat7WcN.ttf'
  ).then((res) => res.arrayBuffer());

  // Load the mascot image using absolute URL
  const mascotUrl = `${siteUrl}/images/mascotte/blue/blue.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F4F2EF',
          position: 'relative',
        }}
      >
        {/* Decorative gradient circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #49AAFF 0%, #8DD1FF 100%)',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffb71c 0%, #ffd166 100%)',
            opacity: 0.3,
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 60,
            padding: '60px 80px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left side - Text content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: 650,
            }}
          >
            {/* Logo text */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  fontFamily: 'Baloo 2',
                  color: '#49AAFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Fidjoo
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 48,
                fontWeight: 700,
                fontFamily: 'Baloo 2',
                color: '#11181C',
                lineHeight: 1.2,
                marginBottom: 20,
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 24,
                fontFamily: 'Baloo 2',
                color: '#454545',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>
          </div>

          {/* Right side - Mascot */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mascotUrl}
              alt="Fidjoo Mascot"
              width={280}
              height={280}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #49AAFF 0%, #8DD1FF 50%, #ffb71c 100%)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Baloo 2',
          data: baloo2Bold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Baloo 2',
          data: baloo2Regular,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}

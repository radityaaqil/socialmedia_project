import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Heading } from '@chakra-ui/react';
import { GiHummingbird } from "react-icons/gi";
import { motion } from 'framer-motion';

function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, "%25$1");
}

/* CONFIG vars */
const CLOUD_NAME = "the-claw";
const IMG_WIDTH = 831;
const IMG_HEIGHT = 466;

/* Build the Cloudinary Image URL */
function generateImageUrl({
  name,
  ticketNo,
  imagePublicID,
  cloudinaryUrlBase = "https://res.cloudinary.com",
  imageWidth = IMG_WIDTH,
  imageHeight = IMG_HEIGHT,
  textAreaWidth = 760,

  ticketNoFont = "Arial",
  ticketNoGravity = "north_east",
  ticketNoLeftOffset = 55,
  ticketNoTopOffset = 140,
  ticketNoColor = "2a3039",
  ticketNoFontSize = 56,

  noFont = "Arial",
  noGravity = "north_east",
  noLeftOffset = 84,
  noTopOffset = 100,
  noColor = "2a3039",
  noFontSize = 16,

  nameFont = "Arial",
  nameGravity = "south_west",
  nameBottomOffset = 239,
  nameLeftOffset = 46,
  nameColor = "ffffff",
  nameFontSize = 48,

  version = null,
}) {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    "c_fill",
    "q_auto",
    "f_auto",
    "r_20",
  ].join(",");

  // configure the name text
  const nameConfig = [
    `w_${textAreaWidth}`,
    "c_fit",
    `co_rgb:${nameColor || textColor}`,
    `g_${nameGravity}`,
    `x_${nameLeftOffset}`,
    `y_${nameBottomOffset}`,
    `l_text:${nameFont}_${nameFontSize}:${cleanText(name)}`,
  ].join(",");

  //configure the "NO." text
  const noConfig = [
    [
      `w_${textAreaWidth}`,
      "c_fit",
      `co_rgb:${noColor}`,
      `a_90`,
      `g_${noGravity}`,
      `x_${noLeftOffset}`,
      `y_${noTopOffset}`,
      `l_text:${noFont}_${noFontSize}:NO.`,
    ].join(","),
  ];

  // configure the ticketNo text
  const ticketNoConfig = ticketNo
    ? [
        `w_${textAreaWidth}`,
        "c_fit",
        `co_rgb:${ticketNoColor}`,
        `a_90`,
        `g_${ticketNoGravity}`,
        `x_${ticketNoLeftOffset}`,
        `y_${ticketNoTopOffset}`,
        `l_text:${ticketNoFont}_${ticketNoFontSize}:${cleanText(ticketNo)}`,
      ].join(",")
    : undefined;

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    CLOUD_NAME,
    "image",
    "upload",
    imageConfig,
    nameConfig,
    noConfig,
    ticketNoConfig,
    version,
    imagePublicID,
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join("/");
}

export default function Landing({name, isShared}) {
  
  const eventName = "My awesome event";
  const ticketAppUrl = "https://my-awesome-ticket-app.dev";
  const title = `${decodeURIComponent(name)} is Going! | ${eventName}`;
  const description = `Join ${name} at ${eventName}. Grab your free ticket on ${ticketAppUrl}.`;

  const imageUrl = generateImageUrl({
    name: name,
    // ticketNo: ticketNo,
    imagePublicID: "ticket_template.png",
  });

  const tweetText = encodeURIComponent("I just got my ticket to an awesome event!\n\nGrab your free ticket and join me!\n\n",
  );
  const twitterShareUrl = encodeURIComponent(`${ticketAppUrl}?name=${name}&shared=true`);
  const twitterShareHref = `https://twitter.com/intent/tweet?url=${twitterShareUrl}&text=${tweetText}`;

  /* LinkedIn Config */
  const linkedInShareUrl = `${ticketAppUrl}?name%3D${name}&shared%3Dtrue`;
  const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${linkedInShareUrl}`;

  const headline = isShared ? `${name} is going!` : "You're in!";
  const subtitle = isShared
      ? `Don't miss out! Sign up to register and join ${name} at ${eventName}.`
      : `Add the event to your calendar and invite your friends to join you at ${eventName}.`;

  const ogUrl = `${ticketAppUrl}?name=${name}&shared=true`;


  return (
    
    <main>
      <Head>
      <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={ticketAppUrl} />
        <meta name="twitter:creator" content="@your_twitter_username" />

        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />

        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={eventName} />
        <meta property="og:image:width" content={IMG_WIDTH} />
        <meta property="og:image:height" content={IMG_HEIGHT} />
        <meta property="og:site_name" content={eventName} />
      </Head>

      {/* <img alt="My ticket" src={imageUrl} /> */}

      <div className='bg-black min-h-screen text-white'>
          <div className='flex justify-between mx-auto px-28 py-6 text-xl items-center'>
            <div className='text-5xl text-pinktertiary font-bold flex space-x-2'>
              <div><GiHummingbird/></div>
              <div>Echo</div>
            </div>
            <div className='flex space-x-10'>
              <Link href="/login"><div className='hover:font-bold hover:cursor-pointer'>Login</div></Link>
              <Link href="/register"><div className='hover:font-bold hover:cursor-pointer'>Register</div></Link>
              <Link href=""><div className='hover:font-bold hover:cursor-pointer'>About</div></Link>
            </div>
          </div>

          <Heading>
            <div className='grid justify-center text-center text-9xl pt-10'>
              <div>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-pinktertiary via-orange-500 to-pinktertiary animate-move-bg bg-[length:400%]'>POST.</span>
              </div>
              <div>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500  via-yellow-500 to-violet-500 animate-move-bg bg-[length:400%]'>SHARE.</span></div>
              <div>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 animate-move-bg bg-[length:400%]'>INTERACT.</span></div>
            </div>
          </Heading>
        </div>

        <h1>{headline}</h1>
        <p>{subtitle}</p>

        {isShared && <a href="https://my-awesome-ticket-app.dev/sign-up">Sign up!</a>}

          {!isShared && (
            <>
              <a href={twitterShareHref} target="_blank" rel="noreferrer">
                Share on Twitter
              </a>
              <a href={linkedInShareHref} target="_blank" rel="noreferrer">
                Share on LinkedIn
              </a>
            </>
          )}
    </main>

    
  )
}

export async function getServerSideProps(context) {

  const { name, shared } = context.query;

  const isShared = shared !== undefined;

  return {
    props: {
      name: decodeURI(name),
      isShared,
    }, // will be passed to the page component as props
  }
}



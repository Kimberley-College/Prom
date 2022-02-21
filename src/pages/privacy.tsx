import type { NextPage } from 'next';
import { Heading, Text, Link } from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import MarkdownRenderer from 'react-markdown';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useCallback } from 'react';

const text = `"Us", "We", and "Our Organisation" all refer to Kimberley College Prom 2022 - an Unincorporated Association.
      
This privacy policy will explain how our organisation uses the personal data we collect from you when you use our website.

## Topics:

What data do we collect?
How do we collect your data?
How will we use your data?
How do we store your data?
Marketing
What are your data protection rights?
What are cookies?
How do we use cookies?
What types of cookies do we use?
How to manage your cookies
Privacy policies of other websites
Changes to our privacy policy
How to contact us
How to contact the appropriate authorities


## What data do we collect?
Kimberley College Prom 2022 collects the following data:

Personal identification information (Name, email address)

## How do we collect your data?
You directly provide Kimberley College Prom 2022 with most of the data we collect. We collect data and process data when you:

Register online or place an order for any of our products or services.
Use or view our website via your browser's cookies.

Kimberley College Prom 2022 may also receive your data indirectly from Microsoft Azure, connected to your college Microsoft 365 Profile.

## How will we use your data?
Kimberley College Prom 2022 collects your data so that we can:

Process your order and manage your account.

When Kimberley College Prom 2022 processes your order, it will send your account data to our payment processor - Stripe - so that we can easily track your purchase.
Their privacy policy can be found [here](https://stripe.com/privacy)

## How do we store your data?
Kimberley College Prom 2022 securely stores your data on Supabase, who manage our database on our behalf. This is secured using secret API keys and row level security for public facing APIs.

Kimberley College Prom 2022 will keep your data - including profile and ticket information - for no longer than ninety (90) days after we cease to need it. We will then delete your data by removing our Postgres database.

## What are your data protection rights?
Kimberley College Prom 2022 would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:

The right to access - You have the right to request Kimberley College Prom 2022 for copies of your personal data. We may charge you a small fee for this service.

The right to rectification - You have the right to request that Kimberley College Prom 2022 correct any information you believe is inaccurate. You also have the right to request Kimberley College Prom 2022 to complete the information you believe is incomplete.

The right to erasure - You have the right to request that Kimberley College Prom 2022 erase your personal data, under certain conditions.

The right to restrict processing - You have the right to request that Kimberley College Prom 2022 restrict the processing of your personal data, under certain conditions.

The right to object to processing - You have the right to object to Kimberley College Prom 2022's processing of your personal data, under certain conditions.

The right to data portability - You have the right to request that Kimberley College Prom 2022 transfer the data that we have collected to another organization, or directly to you, under certain conditions.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our email: [gdpr@prom.kim](mailto:gdpr@prom.kim)

## Cookies
Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. When you visit our websites, we may collect information from you automatically through cookies or similar technology.

For further information, visit [allaboutcookies.org](https://allaboutcookies.org).

How do we use cookies?
Kimberley College Prom 2022 uses cookies to deliver essential functionality, such as keeping you signed in.

We only use functional cookies, which recognise you on our website and remember who you are.

Privacy policies of other websites
The Kimberley College Prom 2022 website contains links to other websites. Our privacy policy applies only to our website, so if you click on a link to another website, you should read their privacy policy.

Changes to our privacy policy
Kimberley College Prom 2022 keeps its privacy policy under regular review and places any updates on this web page. This privacy policy was last updated on 9 January 2019.

How to contact us
If you have any questions about Kimberley College Prom 2022's privacy policy, the data we hold on you, or you would like to exercise one of your data protection rights, please do not hesitate to contact us.

Email us at: [gdpr@prom.kim](mailto:gdpr@prom.kim)

How to contact the appropriate authority
Should you wish to report a complaint or if you feel that Kimberley College Prom 2022 has not addressed your concern in a satisfactory manner, you may contact the Information Commissioner's Office.

Phone: 0303 123 1113

Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF`;

const Privacy: NextPage = () => (
  <BaseLayout>
    <Heading textAlign="center" size="2xl" m={3}>Privacy Policy</Heading>
    <Text whiteSpace="pre-wrap" display="block">
      <MarkdownRenderer
        components={{
          h2: ({ node, ...props }) => useCallback(() => <Heading as="h3" size="lg" {...props} />, [props])(), /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          a: ({ node, ...props }) => useCallback(() => <><Link isExternal {...props as any} /> <ExternalLinkIcon mx="2px" mt="-3px" /></>, [props])(),
        }}
      >{text}
      </MarkdownRenderer>
    </Text>

  </BaseLayout>
);

export default Privacy;

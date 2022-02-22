/* eslint-disable react/no-unstable-nested-components */
import type { NextPage } from 'next';
import {
  Heading, Text, Link, UnorderedList, Box,
} from '@chakra-ui/react';
import BaseLayout from 'components/Layouts/Base';
import MarkdownRenderer from 'react-markdown';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const text = `"Us", "We", and "Our Organisation" all refer to Kimberley College Prom 2022 - an Unincorporated Association.

By using our website, you agree to the following terms and conditions which govern its use. Furthermore, by purchasing products from Kimberley College Prom 2022 you agree to the terms of sale detailed henceforth in the respective sections.

## Topics:

Permission to use website
Misuse of website
Registration and accounts
Cancellation and suspension of your account
Terms of sale
Limited warranties
Limitations and exclusions of liability
Breaches of these terms and conditions
Variation
Assignment
Severability
Third party rights
Entire agreement
Law and jurisdiction
Our details
Appendix 1: Terms of Sale

## Permission to use website
You may:
  - view pages from your website in a web browser
  - download pages from our website
  - install our website as a Progressive Web App
  - purchase products and services advertised on our website

subject to the provisions detailed hereto.

You may only use this website for your own personal purposes.
Except as otherwise permitted, you must not edit or otherwise modify any material on our website
Unless you own or control the relevant rights to the material, you must not republish, redistribute, sell or license any material from our website.

We reserve the right to suspend or restrict access to our website and any of its functionality at any time. You must not circumvent or attempt to circumvent any access restriction.

## Misuse of website
You must not:
  - use our website in any way or take any action that causes, or may cause, damage to the website or impairment of the availability or accessibility of our website;
  - use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;
  - hack or otherwise attempt to tamper with our website;
  - scan or test the vulnerability of our website without our permission;
  - circumvent any authentication systems used on our website;
  - use our website to copy, store, host, transmit, send, use, publish or distribute any material which is not your own;
  - impose an unreasonably large load on our website resources;
  - perform any automatic data collection (including but not limited to scraping and data harvesting) without our written consent;
  - use our website except by means of our public interfaces;
  - do anything that may impede the normal usage of our website.

You must ensure that all information that you supply to us through our website is true, accurate, complete and non-misleading.

## Registration and accounts
To be eligible for an account on our website, you must be a student in Year 13 at Kimberley 16-19 Stem College.

You must not allow any other person to use your account to access this website.

You must notify us in writing immediately if you become aware of any unauthorised use of your account.

You must not use any other person's account to access this website.

You must only use your Kimberley College Microsoft 365 account to register and login to this website.

## Cancellation and suspension of your account
We may suspend, cancel or edit your account at any time with or without notice to you.

You may cancel your account at any time by contacting us at the details found at the bottom of this page.

## Terms of sale
The terms of sale may be found in Appendix 1 of this document.

## Limited warranties
We do not warrant that:
  - our website is complete or accurate;
  - our website is up to date;
  - our website will operate without fault;
  - our website will remain available.

We reserve the right to cease the provision of our services at any time without notice or explanation. You will not be entitled to any payment or compensation upon such discontinuance or alterance of our services.

To the maximum extent permitted by law, we exclude all representations, warranties and conditions relating to our website and the use of our website.

## Limitations and exclusions of liability
Nothing in these terms and conditions will limit or exclude any liability in a way that is not permitted under applicable law.

We will not be liable to you in respect of any losses arising out of any event or events beyond our reasonable control.
We will not be liable to you in respect of any loss or corruption of any data.
We will not be liable to you in respect of any special, indirect or consequential loss or damage.

## Breaches of these terms and conditions
If we suspect that you have breached these terms and conditions set out hereto in any way, we may:
  - send you a formal warning;
  - suspend or cancel your account;
  - prohibit your access to our website;
  - block computers using your IP address from accessing our website;
  - commence legal action against you.

Where we prevent or prohibit your access to our website, you must not take any action to circumvent this.

## Variation
We may revise these terms and conditions at any time without notice or explanation.

The revised terms and conditions shall apply to the use of our website from the date of publication of such revision, and you hereby waive any right to notification or consent to such changes.

## Assignment
You hereby agree that we may assign, transfer, sub-contract or otherwise deal with our rights and obligations under these terms and conditions.

You may not assign or transfer any of your rights or obligations under these terms and conditions.

## Severability
If any part of these terms and conditions is determined by any court or other competent authority to be invalid, illegal or unenforceable, the other provisions of these terms and conditions will continue in full force and effect.

## Third party rights
You agree that we are not liable for any loss or damage caused by any third party.

A contract under these terms it not intended to be enforceable by any third party.

The exercise of the parties' rights under a contract under thsee terms is not subject to the consent of any third party.

## Entire agreement
These terms and conditions, together with our [Privacy Policy](/privacy) and Terms of Sale in Appendix 1, constitute the entire agreement between us in relation to our website and supersede all previous agreements and understandings.

## Law and jurisdiction
These terms and conditions shalt be governed by and construed in accordance with English law.

Any disputes relating to such terms and conditions shalt be subject to the exclusive jurisdiction of the courts of England.

## Our details
This website is owned and operated by Kimberley College Prom 2022.

You can contact us by email at [nick@prom.kim](mailto:nick@prom.kim)

# Appendix 1: Terms of Sale


`;

const Terms: NextPage = () => (
  <BaseLayout>
    <Heading as="h1" size="2xl">Terms and Conditions</Heading>
    <Box>
      <MarkdownRenderer
        components={{
          p: ({ node, ...props }) => <Text whiteSpace="pre-wrap" my={1} {...props} />,
          h2: ({ node, ...props }) => <Heading as="h3" size="lg" my={3} {...props} />, /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          a: ({ node, ...props }) => <><Link isExternal={props.href?.includes('http')} {...props as any} /> <ExternalLinkIcon mx="2px" mt="-3px" /></>,
          ul: ({ node, ordered, ...props }) => <UnorderedList ml={10} {...props} />,
        }}
      >{text}
      </MarkdownRenderer>
    </Box>
  </BaseLayout>
);

export default Terms;

import { Fragment } from 'react';
import { Title } from 'react-shop';
import { PageView } from 'react-shop-mui/PageView';
import { TitleBox } from 'react-shop-mui/TitleBox';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const TermsPage = () => (
  <Fragment>
    <Title title="Terms of use" />
    <PageView>
      <TitleBox title="Terms of use of cookies" withDivider={false} />
      <Typography component="p" gutterBottom variant="subtitle1">
        This page outlines the terms of use regarding cookies when you visit our site. By continuing
        to use our website, you agree to the use of cookies as outlined in this policy.
      </Typography>
      <Typography gutterBottom fontWeight={600} fontSize={16}>
        What Are Cookies?
      </Typography>
      <Typography component="p" gutterBottom variant="subtitle1">
        Cookies are small pieces of data stored on your browser or device by websites you visit.
        They serve various purposes, including remembering your preferences, enhancing your user
        experience, and providing anonymized tracking data to help website owners understand how
        visitors interact with their site.
      </Typography>

      <Typography gutterBottom fontWeight={600} fontSize={16}>
        How We Use Cookies
      </Typography>
      <Typography component="p" variant="subtitle1">
        We use cookies for a variety of purposes, including but not limited to:
      </Typography>
      <ul>
        <li>
          <Typography variant="subtitle2">
            <strong>Essential Cookies:</strong> These are necessary for the website to function
            properly. They enable basic functions like page navigation and access to secure areas of
            the website. Our website cannot function properly without these cookies.
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            <strong>Analytics Cookies:</strong> These cookies help us understand how visitors
            interact with our website by collecting and reporting information anonymously. This
            helps us improve our website and tailor it to our users&apos;needs.
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            <strong>Functionality Cookies:</strong> These cookies enable enhanced functionality and
            personalization, such as remembering your preferences and settings. They may be set by
            us or by third-party providers whose services we have added to our website.
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            <strong>Advertising Cookies:</strong> We and our advertising partners may use these
            cookies to deliver relevant advertisements to you based on your interests. These cookies
            may track your browsing habits and may be used to build a profile of your interests.
          </Typography>
        </li>
      </ul>
      <Divider sx={{ mt: 3, borderColor: 'transparent' }} />
      <Typography gutterBottom fontWeight={600} fontSize={16}>
        Managing Cookies
      </Typography>
      <Typography component="p" gutterBottom variant="subtitle1">
        You have the option to manage cookies through your browser or device settings. Here&apos;s
        how you can do it:
      </Typography>
      <ul>
        <li>
          <Typography variant="subtitle2">
            <strong>Browser Settings:</strong> Most web browsers allow you to control cookies
            through their settings. You can usually find these settings in the &ldquo;Options&rdquo;
            or &ldquo;Preferences&rdquo; menu of your browser. You can choose to block or delete
            cookies, as well as set preferences for certain websites.
          </Typography>
        </li>
        <li>
          <Typography variant="subtitle2">
            <strong>Mobile Device Settings:</strong> If you&apos;re using a mobile device, you can
            usually manage cookies through the device&apos;s settings. This may vary depending on
            your device and operating system, so please refer to your device&apos;s user manual or
            support documentation for instructions.
          </Typography>
        </li>
      </ul>
      <Divider sx={{ mt: 3, borderColor: 'transparent' }} />
      <Typography component="p" gutterBottom variant="subtitle1" sx={{ mb: 5 }}>
        Please note that disabling cookies may affect the functionality of our website and your user
        experience. By continuing to use our website without changing your cookie settings, you
        consent to our use of cookies as described in this policy.
      </Typography>
    </PageView>
  </Fragment>
);

export default TermsPage;

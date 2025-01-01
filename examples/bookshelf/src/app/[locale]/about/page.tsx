import { PageView } from 'react-shop-mui/PageView';
import { TitleBox } from 'react-shop-mui/TitleBox';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  return (
    <PageView>
      <TitleBox title="Welcome to our virtual bookstore!" withDivider={false} />
      <Typography component="p" gutterBottom variant="subtitle1">
        Join us on this journey through the virtual realm of literature, where technology meets
        storytelling, and embark on an adventure of literary exploration like never before. Welcome
        to our world of books, where imagination knows no bounds!
      </Typography>
      <Typography component="p" gutterBottom variant="subtitle1">
        Our site generates captivating content, including book titles, descriptions, and images by
        using AI technology ensuring an ever-refreshing catalog for your browsing pleasure.
      </Typography>
      <Typography component="p" gutterBottom variant="subtitle1">
        It&apos;s important to note that our demo site operates solely for demonstration purposes.
        Use demo login/password credentials from readme file to getting access to fake profile. If
        you are using credentials or social login <strong>do not provide</strong> any sensitive or
        personal information, such as payment details, personal identification numbers, or
        passwords.
      </Typography>
    </PageView>
  );
}

import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  RssIcon,
  TwitterIcon,
} from "./icons";
import { rssUrl } from "./urls.server";

export const social = [
  {
    name: "Twitter",
    href: "https://twitter.com/felixmokross",
    icon: TwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/felixmokross",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/felixmokross",
    icon: InstagramIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/felixmokross",
    icon: GithubIcon,
  },
  {
    name: "RSS",
    href: rssUrl,
    icon: RssIcon,
  },
];

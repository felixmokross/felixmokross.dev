import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { displayDateFormat } from "../../shared/util";
import profilePictureCircle from "../../shared/profile-picture-circle.png";
import { PostMeta } from "../../shared/types";

export function PostAuthorAvatar({ post }: PostAuthorAvatarProps) {
  return (
    <Link href="/">
      <a className="flex items-center">
        <Image
          src={profilePictureCircle}
          alt="Profile picture Felix Mokross"
          width={48}
          height={48}
          priority={true}
        />
        <div className="ml-3">
          <p className="text-base font-medium text-slate-900 dark:text-slate-50">
            Felix Mokross
          </p>
          <p className="mt-0.5 text-sm text-slate-400 dark:text-slate-400">
            <time dateTime={post.date}>
              {dayjs(post.date).format(displayDateFormat)}
            </time>
          </p>
        </div>
      </a>
    </Link>
  );
}

export type PostAuthorAvatarProps = {
  post: PostMeta;
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

type Props = {
  url: string
  title: string
  hashtags:string
}

const SnsBtn = ({ url, title, hashtags }: Props) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedHashtags = encodeURIComponent(hashtags);

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a role="button" href={`https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`} target="_blank" rel="noopener noreferrer"
        className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
      >
      <FontAwesomeIcon icon={faXTwitter} />で共有する
      </a>
  </div>
  )
}

export default SnsBtn

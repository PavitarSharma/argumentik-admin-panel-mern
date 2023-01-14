import { useSelector } from "react-redux"

const SocialMediaIcons = () => {
  const { user } = useSelector(state => state.users)
  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      <a
        className="hover:opacity-50 transition duration-500"
        href={user.linkedinLink}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="linkedin-link" src="images/linkedin.png" />
      </a>
      
      <a
        className="hover:opacity-50 transition duration-500"
        href={user.facebookLink}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="facebook-link" src="images/facebook.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href={user.instagramLink}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="instagram-link" src="images/instagram.png" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;

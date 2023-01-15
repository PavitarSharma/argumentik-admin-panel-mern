import { useSelector } from "react-redux"

const SocialMediaIcons = () => {
  const { social } = useSelector(state => state.users)
  // const social = JSON.parse(localStorage.getItem("social"))
  return (
    <div className="flex justify-center md:justify-start my-10 gap-7">
      <a
        className="hover:opacity-50 transition duration-500"
        href={social.linkedinLink ? social.linkedinLink : "https://www.linkedin.com"}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="linkedin-link" src="images/linkedin.png" />
      </a>
      
      <a
        className="hover:opacity-50 transition duration-500"
        href={social.facebookLink ? social.facebookLink : "https://www.facebook.com"}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="facebook-link" src="images/facebook.png" />
      </a>
      <a
        className="hover:opacity-50 transition duration-500"
        href={social.instagramLink ? social.instagramLink : "https://www.instagram.com/"}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="instagram-link" src="images/instagram.png" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;

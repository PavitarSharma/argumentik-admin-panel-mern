import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socialLinks, updateSocialLinks } from "../../redux/slice/userSlice";

const Social = () => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const jsonData = {
      facebookLink: facebook,
      instagramLink: instagram,
      linkedinLink: linkedin,
    };
    // dispatch(updateSocialLinks(jsonData, toast));
    dispatch(socialLinks(jsonData))
    // localStorage.setItem("social", JSON.stringify(jsonData));
  };
  return (
    <div>
      <form
        className="flex flex-col gap-8 max-w-[400px] w-[100%0 bg-white] rounded py-[20px] px-[24px] mt-10 shadow-xl"
        onSubmit={handleOnSubmit}
      >
        <div>
          <input
            id="facebookLink"
            type="url"
            name="facebookLink"
            onChange={(event) => setFacebook(event.target.value)}
            required
            value={facebook}
            placeholder="Facebook Url"
            className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
          />
        </div>
        <div className="form-control">
          <input
            id="instagramLink"
            type="url"
            name="instagramLink"
            onChange={(event) => setInstagram(event.target.value)}
            required
            value={instagram}
            placeholder="Instagram Url"
            className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
          />
        </div>

        <div>
          <input
            id="linkedinLink"
            type="url"
            name="linkedinLink"
            onChange={(event) => setLinkedin(event.target.value)}
            required
            value={linkedin}
            placeholder="Linkedin Url"
            className="border-[1px] border-gray-500 w-full px-2 py-[14px] outline-none rounded"
          />
        </div>

        <button
          className="bg-blue py-[10px] text-white font-semibold text-lg cursor-pointer rounded"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Social;

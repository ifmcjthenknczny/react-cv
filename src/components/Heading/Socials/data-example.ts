import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { getData } from "../../../helpers";
import { splitFullName } from "../../../helpers";

const { name: fullName } = await getData("Heading");
const [name] = splitFullName(fullName);

const mail = "rainbowenchanter@unicornmail.com";
const phone = "+48 694 202 137";

const mailto = `mailto:${mail}?subject=Enchanted%20Response%20to%20Your%20CV&body=Dear%20${name},%0D%0A%0D%0A`;

const data = {
  socials: [
    {
      type: faMapMarkerAlt,
      label: "Łódź, Poland",
    },
    {
      type: faGithub,
      label: "enchantingcoder",
      url: "https://github.com/enchantingcoder",
    },
    {
      type: faEnvelope,
      label: mail,
      url: mailto,
    },
    {
      type: faPhone,
      label: phone,
      url: `tel:${phone}`,
    },
    {
      type: faLinkedin,
      label: "rainbowenchanter",
      url: "https://www.linkedin.com/in/rainbowenchanter",
    },
  ],
};

export default data;

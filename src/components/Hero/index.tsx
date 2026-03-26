import type { LabelValue } from "../../types/common";
import SvgMaskImage from "../SvgMaskImage";
import styles from "./styles.module.css";

type HeroOrgValue = {
  name: string;
  orgImage: string;
  orgImageAspect: number;
};

type HeroValue =
  | (LabelValue<string> & {
      type?: "text";
    })
  | (LabelValue<HeroOrgValue> & {
      type: "org";
    });

type Props = {
  title: string;
  values: HeroValue[];
  readingTime: {
    text: string;
    minutes: string;
  };
};

const Hero: React.FC<Props> = ({ title, values, readingTime }) => (
  <header className={`col max-width-m ${styles.root}`}>
    <h1 className={styles.title}>{title}</h1>

    {/* <div className="row kicker justify-start">
      <span className="overline text-s">{readingTime.text}</span>
    </div> */}

    <table className={`${styles.metaTable} text-m`}>
      <tbody>
        {values.map((item, index) => (
          <tr className={styles.metaRow} key={`${item.label}-${index}`}>
            <th className={`overline ${styles.metaHead}`} scope="row">
              {item.label}
            </th>

            <td>
              {item.type === "org" ? (
                <div className="org-cell row align-center justify-start gap-2">
                  <SvgMaskImage
                    className={styles.orgLogo}
                    src={item.value.orgImage}
                    aspectRatio={item.value.orgImageAspect}
                  />

                  <span className={styles.org}>{item.value.name}</span>
                </div>
              ) : (
                <span>{item.value}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </header>
);

export default Hero;

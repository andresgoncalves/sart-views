import { Children, useState } from "react";
import Tab from "./Tab";
import styles from "./TabbedPanel.module.scss";

/**
 * @typedef {{
 *   name: string;
 *   tabs?: string[];
 *   children?: React.ReactNode;
 * }} TabbedPanelProps
 */

/**
 * @param {TabbedPanelProps} props
 * @returns
 */
export default function TabbedPanel({ name, tabs, children }) {
  const [active, setActive] = useState(0);
  const handleChange = (event) => setActive(event.target.value);
  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            value={index}
            name={name}
            onChange={handleChange}
            checked={index == active}
          >
            {tab}
          </Tab>
        ))}
      </div>
      <div className={styles.content}>
        {Children.map(children, (child, index) => index == active && child)}
      </div>
    </div>
  );
}

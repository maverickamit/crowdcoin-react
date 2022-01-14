import { Menu } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import Link from "next/link";
export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <Menu.Item name="CrowdCoin" />
      </Link>
      <Menu.Menu position="right">
        <Link href="/">
          <Menu.Item name="Campaigns"></Menu.Item>
        </Link>
        <Link href="/campaigns/new">
          <Menu.Item>
            <Icon name="add" />
          </Menu.Item>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

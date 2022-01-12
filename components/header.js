import { Menu } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item name="CrowdCoin" />
      <Menu.Menu position="right">
        <Menu.Item name="Campaigns"></Menu.Item>
        <Menu.Item>
          <Icon name="add" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

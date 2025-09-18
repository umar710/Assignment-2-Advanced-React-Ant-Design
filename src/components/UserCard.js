import React from "react";
import { Card } from "antd";

function UserCard({ user, onEdit }) {
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`;

  return (
    <Card
      hoverable
      cover={<img alt={user.username} src={avatarUrl} />}
      actions={[
        <span
          key="edit"
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={onEdit}
        >
          Edit
        </span>,
      ]}
    >
      <Card.Meta
        title={user.name}
        description={
          <>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            {user.company && (
              <p>
                <strong>Company:</strong> {user.company.name}
                <br />
                <em>{user.company.catchPhrase}</em>
              </p>
            )}
          </>
        }
      />
    </Card>
  );
}

export default UserCard;

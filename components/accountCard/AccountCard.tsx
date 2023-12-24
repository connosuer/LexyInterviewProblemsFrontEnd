import React, { useEffect, useState } from 'react';
import { Card, Modal, Button, Avatar, Typography } from "@mui/material";
import styles from "./AccountCard.module.css";

type IPlatform = "facebook" | "instagram" | "linkedin";

interface IProfile {
  id: string;
  avatar: string;
  platform: IPlatform;
  username: string;
  tastes: { title: string; elements: string[] }[];

}

export interface IAccountCard {
  profiles: IProfile[];
  editable?: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AccountCard: React.FC<IAccountCard> = ({
  profiles,
  editable,
  setIsProfileModalOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [integrations, setIntegrations] = useState<IProfile[]>([]);
  const [newProfile, setNewProfile] = useState<IProfile>({ id: '', avatar: '', platform: 'facebook', username: '', tastes: [] });
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    setIntegrations(profiles);
  }, [profiles]);

  const handleAddProfile = () => {
    setIntegrations([...integrations, newProfile]);
    setNewProfile({ id: '', avatar: '', platform: 'facebook', username: '', tastes: [] });
    setIsModalOpen(false);
  };

  return (
    <Card>
      <div className={styles["card"]}>
        {integrations.map((item) => (
          <Button key={item.id} onClick={() => {
            setSelectedProfile(item);
            setIsProfileModalOpen(true);
          }}>
            <Avatar alt={item.username} src={item.avatar} />
            {item.username}
          </Button>
        ))}
        {editable && (
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Add</Button>
            {/* Modal for adding new profile */}
            {isModalOpen && (
              <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ /* ... modal styles */ }}>
                  <input 
                    type="text" 
                    value={newProfile.username}
                    onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
                    placeholder="Username"
                  />
                  {/* Add other input fields for id, avatar, platform, and tastes */}
                  <Button onClick={handleAddProfile}>Save Profile</Button>
                </div>
              </Modal>
            )}
          </div>
        )}
        {/* Profile Display Modal */}
        {selectedProfile && (
  <Modal
    open={selectedProfile !== null}
    onClose={() => setSelectedProfile(null)}
  >
    <div style={{ /* ... modal styles */ }}>
      <Typography variant="h6">{selectedProfile.username}</Typography>
      {selectedProfile.tastes.map((taste, index) => (
        <div key={index}>
          <Typography variant="subtitle1">{taste.title}</Typography>
          <ul>
            {taste.elements.map((element: string, idx: number) => (
              <li key={idx}>{element}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Modal>
)}  
      </div>
    </Card>
  );
};

export default AccountCard;


import React from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { useState } from 'react';
import './ProfileHeader.css'; 

const ProfileHeader = ({ user }) => {
  // const ProfileHeader = ({ profile }) => {
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    
    // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // const handleCopyProfileLink = () => {
    //     alert('Profile link copied to clipboard!');
    // };
  return (
    <div className="profile-header">
      <div className="profile-picture">
        <img src={user.picture} alt={`${user.name}'s profile`} />
      </div>
      <div className="profile-details">
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
        <div className="profile-stats">
          <span>{user.postsCount} Posts</span>
          <span>{user.followersCount} Followers</span>
          <span>{user.followingCount} Following</span>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    Settings
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <a href="#settings">Settings</a>
                    </DropdownItem>
                    <DropdownItem>
                        <CopyToClipboard text={window.location.href} onCopy={handleCopyProfileLink}>
                            <button className="dropdown-button">Copy Profile Link</button>
                        </CopyToClipboard>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown> */}
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;


//     return (
//         <div className="profile-header">
//             <h1>{profile.name}</h1>
            
//         </div>
//     );
// };

// export default ProfileHeader;


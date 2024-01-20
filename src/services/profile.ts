import { IProfile } from '../containers/Profile/models';
import { getRequest } from './methods';

interface IProfileService {
  getProfile: () => Promise<IProfile>;
}

class ProfileService implements IProfileService {
  private baseURL = process.env.REACT_APP_BASE_URL;
  _profileUrl = `${this.baseURL}/api/profile`;

  getProfile = async (): Promise<IProfile> => {
    const response = await getRequest(this._profileUrl);
    return response;
  };
}

export default ProfileService;

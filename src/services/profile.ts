import { getRequest } from './methods';

export interface IProfile {
  name: string;
  job: string;
  email: string;
  location: string;
  interests: string[];
  bio: string;
  avatar: string;
}

class ProfileService {
  private baseURL = process.env.REACT_APP_BASE_URL;
  _profileUrl = `${this.baseURL}/api/profile`;

  getProfile = async (): Promise<IProfile> => {
    const response = await getRequest(this._profileUrl);
    return response;
  };
}

export default ProfileService;

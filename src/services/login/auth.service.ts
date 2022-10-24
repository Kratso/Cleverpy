import { UserState } from "../../features/login/loginSlice";

class AuthService {
  async login(username: string, password: string) {
    // This would be super cool if I would actually be bothered to setup a some fake service to actually do the stuff
    // But, alas, sinon's fakeserver is too tiresome for me to actually make work, so absolute bullshit has been written

    //  const user = (await axios
    //   .post(API_URL + "signin", {
    //     username,
    //     password
    //   })).data;
    //
    //     return user;
    //   });

    const goodResponse : UserState = {
      status: {
        status: "OK",
        error: null,
      },
      user: {
        id: 1,
        name: "Zéphyrine Nilüfer",
        followers: 4410,
      },
    }

    const badResponse : UserState = {
      status: {
        status: 'KO',
        error: 'Invalid username/password combo'
      },
      user: null,
    }
    
    if (username && password) {
      return goodResponse
    }
    return badResponse;
  }

  logout() {
    // Just in case we need to alert anyone we are loging out. I will NOT elaborate.
  }

  async register(username: string, email: string, password: string) {

    // NO, BAD, TSK! No registering, we aren't doing any actual Auth bullshit, at least on my watch.

    // return axios.post(API_URL + "signup", {
    //   username,
    //   email,
    //   password
    // });
  }
}

export default new AuthService();

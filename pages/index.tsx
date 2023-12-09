import WelcomeScreen from '@/src/components/welcome-screen';
// import WithAuth from '@/src/hoc/with-auth';
import withStore from '@/src/hoc/with-store';

const WelcomeScreenWithStore = withStore(WelcomeScreen);
// const WelcomeScreenWithAuth = WithAuth(WelcomeScreenWithStore);
export default WelcomeScreenWithStore;

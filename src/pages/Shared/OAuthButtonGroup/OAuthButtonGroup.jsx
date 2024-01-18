import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const OAuthButtonGroup = () => {
    const { loginWithPopup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSocialLogin = (provider) => {
        const promiseLoading = toast.loading('Waiting for Social Login');
        () => promiseLoading;
        loginWithPopup(provider)
            .then((result) => {
                const loggedUser = result.user;
                toast.dismiss(promiseLoading);
                toast.success(
                    `${loggedUser.email ? loggedUser.email : 'Social'} is Logged In Successful!`
                );
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                toast.dismiss(promiseLoading);
                toast.error(error.message);
            });
    };
    return (
        <ButtonGroup variant='secondary' spacing='4'>
            <Button
                onClick={() => handleSocialLogin(googleProvider)}
                flexGrow={1}
                className='border border-slate-300 hover:bg-slate-200'
            >
                <span className='text-2xl'>
                    <FcGoogle />
                </span>
            </Button>
            <Button
                onClick={() => handleSocialLogin(githubProvider)}
                flexGrow={1}
                className='border border-slate-300 hover:bg-slate-200'
            >
                <span className='text-2xl'>
                    <FaGithub />
                </span>
            </Button>
        </ButtonGroup>
    );
};

export default OAuthButtonGroup;

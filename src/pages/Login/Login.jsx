import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';
import { PasswordField } from '../Shared/PasswordField/PasswordField';
import OAuthButtonGroup from '../Shared/OAuthButtonGroup/OAuthButtonGroup';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const { loginUser } = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault();
        const promiseLoading = toast.loading('Account Signing');
        () => promiseLoading();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                toast.dismiss(promiseLoading);
                toast.success(`${loggedUser.email} is Successfully Signed In`);
            })
            .catch((error) => {
                toast.dismiss(promiseLoading);
                toast.error(error.message);
            });
    };

    return (
        <div className='px-5'>
            <Container maxW='lg' py={{ base: '12', md: '20' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing='8'>
                    <Stack spacing='6'>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                            <Heading size={{ base: 'lg', md: 'xl' }}>
                                Log in to your account
                            </Heading>
                            <Text className='text-lg' color='fg.muted'>
                                Don't have an account?{' '}
                                <Link
                                    to='/register'
                                    className='text-pink-400 font-bold hover:underline hover:text-pink-600'
                                >
                                    Sign up
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg.surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <form onSubmit={handleSignIn}>
                            <Stack spacing='6'>
                                <Stack spacing='5'>
                                    <FormControl>
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input
                                            id='email'
                                            name='email'
                                            type='email'
                                            placeholder='Enter Email'
                                            required
                                        />
                                    </FormControl>
                                    <PasswordField />
                                </Stack>
                                <HStack justify='space-between'>
                                    <Checkbox defaultChecked>Remember me</Checkbox>
                                    <Button variant='text' size='sm'>
                                        Forgot password?
                                    </Button>
                                </HStack>
                                <Stack spacing='6'>
                                    <Input
                                        type='submit'
                                        className='!bg-pink-400 mt-1 cursor-pointer text-white font-bold hover:!bg-pink-600'
                                        value='Login'
                                    />
                                    <HStack>
                                        <Divider />
                                        <Text textStyle='sm' whiteSpace='nowrap' color='fg.muted'>
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <OAuthButtonGroup />
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
};

export default Login;

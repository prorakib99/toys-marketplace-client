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
import { PasswordField } from '../../pages/Shared/PasswordField/PasswordField';
import OAuthButtonGroup from '../../pages/Shared/OAuthButtonGroup/OAuthButtonGroup';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className='px-5'>
            <Container maxW='lg' py={{ base: '12', md: '20' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing='8'>
                    <Stack spacing='6'>
                        <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                            <Heading size={{ base: 'lg', md: 'xl' }}>
                                Register to your account
                            </Heading>
                            <Text className='text-lg' color='fg.muted'>
                                Already have an account?{' '}
                                <Link
                                    to='/login'
                                    className='text-pink-400 font-bold hover:underline hover:text-pink-600'
                                >
                                    Log in
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
                        <form>
                            <Stack spacing='6'>
                                <Stack spacing='5'>
                                    <FormControl>
                                        <FormLabel htmlFor='name'>Name</FormLabel>
                                        <Input
                                            id='name'
                                            type='text'
                                            placeholder='Your Name...'
                                            required
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor='email'>Email</FormLabel>
                                        <Input
                                            id='email'
                                            type='email'
                                            placeholder='Your Email...'
                                            required
                                        />
                                    </FormControl>
                                    <PasswordField />
                                    <FormControl>
                                        <FormLabel htmlFor='photo'>Photo URL</FormLabel>
                                        <Input
                                            id='photo'
                                            type='text'
                                            placeholder='https://example.com/img.jpg'
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing='6'>
                                    <Input
                                        type='submit'
                                        className='!bg-pink-400 mt-1 cursor-pointer text-white font-bold hover:!bg-pink-600'
                                        value='Sign Up'
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

export default Register;

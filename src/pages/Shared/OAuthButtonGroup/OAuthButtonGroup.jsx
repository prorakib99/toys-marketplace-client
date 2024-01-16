import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const providers = [
    { name: 'Google', icon: <FcGoogle /> },
    { name: 'GitHub', icon: <FaGithub /> }
];

const OAuthButtonGroup = () => {
    return (
        <ButtonGroup variant='secondary' spacing='4'>
            {providers.map(({ name, icon }) => (
                <Button
                    key={name}
                    flexGrow={1}
                    className='border border-slate-300 hover:bg-slate-200'
                >
                    <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                    <span className='text-2xl'>{icon}</span>
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default OAuthButtonGroup;

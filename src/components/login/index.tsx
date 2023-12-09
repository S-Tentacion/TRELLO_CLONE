import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  Image,
  Link,
  Text,
  Alert,
  AlertDescription,
  CloseButton,
  AlertTitle,
  AlertIcon,
  useToast,
  chakra
} from '@chakra-ui/react';
import checkEnvironment from '@/util/check-environment';
import { useRouter } from 'next/router';
import inviteUser from '@/util/invite-user';
import { useDispatch } from 'react-redux';
import { updateUserData } from '@/src/slices/user';

const Login = (): JSX.Element => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setErrorState] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  const validate = () => {
    if (!validEmail.test(values.email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }

    if (!validPassword.test(values.password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const host = checkEnvironment();
  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();
    if (emailErr || passwordErr) {
      toast({
        position: 'top',
        title: 'Invalid Email or Password',
        description: 'Please enter valid email or password. ',
        status: 'error',
        duration: 2500,
        isClosable: true
      });
      return;
    }
    setIsFetching(true);

    const data = {
      email: values.email,
      password: values.password
    };

    const url = `${host}/api/login`;

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

    const result = await response.json();
    setIsFetching(false);

    const { email: inviteEmail, token, boardId } = router.query;
    const isInvitedUser = inviteEmail && token && boardId;

    if (isInvitedUser && result.message === 'success') {
      const hasInvited = await inviteUser({ email: inviteEmail, boardId });

      if (hasInvited) {
        router.push('boards');
      }
    } else if (result.message === 'success') {
      dispatch(updateUserData({ type: 'id', value: result.id }));
      dispatch(updateUserData({ type: 'isValid', value: true }));
      router.push('boards');
    }

    if (response.status === 404) {
      setErrorState(true);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate();
  };

  const showLoginError = () => {
    if (!hasError) return;

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
        <AlertDescription>Invalid username or password</AlertDescription>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => setErrorState(!hasError)}
        />
      </Alert>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" my="40px">
        <Image height="20px" mt="2" src="/trello-icon.svg" alt="brand logo"></Image>
        <Text fontWeight="bold" fontSize="28px" m="4px">
          Trello
        </Text>
      </Box>

      <Flex
        alignItems="center"
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent="center">
        <Image
          position="absolute"
          bottom="5%"
          left="5%"
          src="/login/left.svg"
          alt=" new user illustration"
          width={[0, '30%']}
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src="/login/right.svg"
          alt="task scheduler illustration"
          width={[0, '30%']}
          borderRadius="3px"
        />
        <Box
          p="25px 40px"
          width={['80%', '60%', '45%', '35%']}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px">
          <Box
            textAlign="center"
            color="#5E6C84"
            mt="5"
            mb="25"
            fontSize={['16px', '16px', '20px', '20px']}
            fontWeight="semibold"
            lineHeight="normal">
            <h1>Log in to Trello</h1>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={loginUser}>
              <FormControl>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Enter Email... "
                  onChange={handleChange}
                  autoComplete="off"
                />
                {emailErr && (
                  <chakra.p color="red" textAlign="center">
                    Invalid email.
                  </chakra.p>
                )}
              </FormControl>
              <FormControl mt={6}>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter Password... "
                  autoComplete="off"
                  onChange={handleChange}
                />
                {passwordErr && (
                  <chakra.p color="red" textAlign="center">
                    Invalid password.
                  </chakra.p>
                )}
              </FormControl>
              <Button
                width="full"
                mt={4}
                bg="success"
                color="white"
                onClick={loginUser}
                type="submit"
                isLoading={isFetching}
                loadingText="Logging">
                Sign In
              </Button>
              <Box m="5" textAlign="center">
                <Link href="/signup" color="brand" p="2" _focus={{ boxShadow: 'none' }}>
                  Sign up for an account
                </Link>
              </Box>
              {showLoginError()}
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;

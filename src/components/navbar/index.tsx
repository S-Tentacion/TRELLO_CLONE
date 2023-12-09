/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import {
  Button,
  Image,
  Flex,
  Box,
  Spacer,
  Tabs,
  TabList,
  Tab,
  Heading,
  TabIndicator,
  AvatarGroup,
  Avatar,
  Input,
  Center,
  Divider,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/src/hooks';
import { GrLogout } from 'react-icons/gr';
import { IoSearchOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { resetUserData } from '@/src/slices/user';
import { useDispatch } from 'react-redux';

type IProps = {
  bg?: string;
};

const tabs = [
  'Overview',
  'List',
  'Board',
  'Timeline',
  'Calender',
  'Dashboard',
  'Messages',
  'More...'
];

const NavBar: FC<IProps> = ({ bg }) => {
  const user = useAppSelector((state) => state.user);
  const router=useRouter()
const dispatch=useDispatch()
  const logout = async () => {
    const URL = '/api/logout';

    const response = await fetch(URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({})
    });

    const responseInJson = await response.json();

    if (responseInJson.message === 'success') {
      router.push('/')
      dispatch(resetUserData());
    }
  };

  const renderButtons = () => {
    if (user?.isValid) {
      return (
        <Flex alignItems="center" justifyContent="space-between">
          <AvatarGroup size="sm" max={4} display={['none', 'flex']}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <Center height="40%" m="0 2rem" display={['none', 'flex']}>
            <Divider orientation="vertical" />
          </Center>

          <InputGroup>
            <InputLeftElement pointerEvents="none" left="22px">
              <Icon as={IoSearchOutline} color="grey" />
            </InputLeftElement>
            <Input size="md" m="0 1rem" borderRadius="50px" border="2px solid grey" />
          </InputGroup>
          <Button
            fontSize="20"
            color="danger"
            variant="link"
            float="right"
            mr="2"
            pr="2"
            _focus={{
              boxShadow: 'none'
            }}
            onClick={logout}>
            <GrLogout />
          </Button>
        </Flex>
      );
    }

    return (
      <>
        <Button fontSize="20" color="brand" variant="link" float="right" mr="2" pr="2">
          <Link href="/login">Log in</Link>
        </Button>
        <Button fontSize="md" colorScheme="green" color="white" m="4">
          <Link href="/signup">Sign up</Link>
        </Button>
      </>
    );
  };

  return (
    <Box bg={bg} boxShadow="md" p="6px 10px">
      <Flex>
        {user?.isValid ? (
          <Flex>
            <Link href="/boards">
              <Image height="8" src="/shoe.svg" alt="brand logo" m="5"></Image>
            </Link>
            <Box display={['none', 'block']}>
              <Heading size="md">Sprint Plans</Heading>
              <Tabs>
                <TabList>
                  {tabs.map((tab) => {
                    return (
                      <Tab
                        key={tab}
                        _focus={{
                          boxShadow: 'none'
                        }}
                        _selected={{ color: 'green', borderBottom: '1px solid green' }}>
                        {tab}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabIndicator mt="-1.5px" height="2px" bg="green" borderRadius="1px" />
              </Tabs>
            </Box>
          </Flex>
        ) : (
          <Image height="8" src="/trello-logo.svg" alt="brand logo" m="5"></Image>
        )}
        <Spacer />
        {renderButtons()}
      </Flex>
    </Box>
  );
};

NavBar.propTypes = {
  bg: PropTypes.string
};

export default NavBar;

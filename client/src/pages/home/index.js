import React from 'react';
import {Box, Heading, Divider, Flex} from '@chakra-ui/react';
import stats from '../../assets/stats.json';
import StatCard from '../../components/stat';

export default function HomePage() {
  return (
    <Box flex='1' as='section' padding='5'>
      <Box padding='10px'>
        <Heading color='teal.main' size='xl'>
          Welcome back
        </Heading>
        <Heading color='gray' size='sm'>
          Check out our lastest movements...
        </Heading>
      </Box>
      <Flex
        marginBottom='10'
        justifyContent={{sm: 'center', md: 'center', md: 'center', xl: 'space-between'}}
        flexWrap='wrap'
        marginTop='5'
      >
        {stats.map((stat, i) => {
          return <StatCard {...stat} key={i} />;
        })}
      </Flex>
      <Divider />
    </Box>
  );
}

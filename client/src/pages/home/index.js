import React from 'react';
import {Box, Divider, Flex} from '@chakra-ui/react';
import stats from '../../assets/stats.json';
import StatCard from '../../components/stat';
import Title from '../../components/title/index';
export default function HomePage() {
  return (
    <Box flex='1' as='section' padding='5'>
      <Title title='Welcome back' subtitle='Check out our lastest movements...' />
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

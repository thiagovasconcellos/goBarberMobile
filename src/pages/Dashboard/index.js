import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Alert} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointments';

import {Container, Title, List} from './styles';

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('/appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    Alert.alert('Cancelamento', 'Tem certeza que deseja cancelar?', [
      {text: 'Nao cancelar', onPress: () => {}, style: 'cancel'},
      {
        text: 'Pode cancelar',
        onPress: async () => {
          const response = await api.delete(`/appointments/${id}`);

          setAppointments(
            appointments.map(appointment =>
              appointment.id === id
                ? {
                    ...appointment,
                    canceled_at: response.data.canceled_at,
                  }
                : appointment,
            ),
          );
          Alert.alert(
            'Cancelamento de agendamento',
            'Seu cancelamento foi efetuado!',
          );
        },
      },
    ]);
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);

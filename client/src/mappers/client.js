import Client from '../entities/client';

export default function apiToEntity(client) {
  return new Client(client);
}

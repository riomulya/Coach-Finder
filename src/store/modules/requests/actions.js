export default {
  async contactCoach(context, payload) {
    const newMessage = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://vue-http-58ef4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newMessage),
      }
    );
    const responseData = response.json();

    newMessage.id = responseData.name;
    newMessage.coachId = payload.coachId;

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Send Requests'
      );
      throw error;
    }

    context.commit('addRequest', newMessage);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-http-58ef4-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to Fetch');
      throw error;
    }
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};

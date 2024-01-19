const getCredentials = async (request: Request) => {
  const formData = await request.formData();
  return JSON.parse(formData.get('credentials')?.toString() || '');
};

export default getCredentials;

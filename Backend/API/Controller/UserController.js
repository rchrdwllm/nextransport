let user = supabase.auth.getUser();

function getUser(){
  user;
}

await supabase.auth.signUp({
  id,
  firstname,
  lastname,
  gender,
  email,
  phonenumber,
  password
})

function getUserProfileId(uid){
  return user.find(u => u.id === uid);
}
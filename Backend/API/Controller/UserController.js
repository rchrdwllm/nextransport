let user = supabase.auth.getUser();

function getUser(){
  user;
}

await supabase.auth.signUp({
  email,
  gender,
  phonenumber,
  password

})

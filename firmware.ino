Servo SELECTOR;


int updateState(String param)
{
  Serial.println("event received...");
  Serial.println(param);

  if(param == "great") SELECTOR.write(162);
  if(param == "good")  SELECTOR.write(126);
  if(param == "fine")  SELECTOR.write(90);
  if(param == "bad")   SELECTOR.write(54);
  if(param == "bad!")  SELECTOR.write(18);

  delay(1500);

  return 1;
}


void setup()
{
  Serial.begin(9600);
  SELECTOR.attach(A0);
  Spark.function("updateState", updateState);
}

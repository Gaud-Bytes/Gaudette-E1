var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      result = calcDistance(query);
    }
    else if (query['cmd'] == 'calcCost')
    {
      result = calcCost(query);
    }
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcDistance(query)
{
  if (query['budget'] == undefined)  
    throw Error("Expecting a budget Value");
    
  if (query['mpg'] == undefined)  
    throw Error("Expecting an mpg Value");
    
  if (query['fuelCost'] == undefined)  
    throw Error("Expecting a fuelCost Value");
    
  if(query['budget'] <= 0 || isNaN(query['budget']))
    throw Error("Invalid budget Value");
    
  if(query['mpg'] <= 0 || isNaN(query['mpg']))
    throw Error("Invalid mpg Value");
    
  if(query['fuelCost'] <= 0 || isNaN(query['fuelCost']))
    throw Error("Invalid fuelCost Value");
    
  var distance = 0;
  
  distance = parseInt(query['mpg']) / parseInt(query['fuelCost']) * parseInt(query['budget']);

  var result = {'distance' : distance}; 
  return result;
}

function calcCost(query)
{
  if (query['distance'] == undefined)  
    throw Error("Expecting a distance Value");
    
  if (query['mpg'] == undefined)  
    throw Error("Expecting an mpg Value");
    
  if (query['fuelCost'] == undefined)  
    throw Error("Expecting a fuelCost Value");
    
  if(query['distance'] <= 0 || isNaN(query['distance']))
    throw Error("Invalid distance Value");
    
  if(query['mpg'] <= 0 || isNaN(query['mpg']))
    throw Error("Invalid mpg Value");
    
  if(query['fuelCost'] <= 0 || isNaN(query['fuelCost']))
    throw Error("Invalid fuelCost Value");
    
  var cost = 0;
  
  cost = parseInt(query['distance']) / parseInt(query['mpg']) * parseInt(query['fuelCost']);

  var result = {'cost' : cost}; 
  return result;
  
}


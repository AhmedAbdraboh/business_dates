# Business Dates

**This is a simple app with one API that gets the business date of date with corresponding delay**

## Install and Run
* Clone the project.
* Install Node v10.16.3
* Run 

      npm install
* Run

      npm start
Now the app is running on PORT=3000

## Test
* Run

      npm test 
to run the tests. 

## APIs
* GET || POST 
      /api/v1/businessDates/getBusinessDateWithDelay
   * Input Params: 

            initialDate: ISODate
            delay: number

    Ex: initialDate=2018-11-10T10:10:10Z&delay=3
   * Output: 

      {
            "ok": true,
            "initialQuery": {
                  "initialDate": "2018-11-10T10:10:10Z",
                  "delay": 3
            },
            "results": {
                  "businessDate": "2018-11-15T12:10:10.000+02:00",
                  "totalDays": 6,
                  "holidayDays": 1,
                  "weekendDays": 2
            }
      }



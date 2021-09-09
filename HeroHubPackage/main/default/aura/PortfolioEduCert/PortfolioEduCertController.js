({
    doInit : function(component) {

        let schoolInfo = component.get('c.getSchools');
        schoolInfo.setCallback(this, function(response){
            if(response.getState()==='SUCCESS') {
                //Sets the education in the database to attribute data
                component.set('v.data', response.getReturnValue())
            }
        });
        $A.enqueueAction(schoolInfo);
    }
})

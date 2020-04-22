({
	handleNavigation : function(component, event, helper) {
        
        var flowToLaunch = component.get("v.flowToLaunch");
        var showFlowInModal = component.get("v.showFlowInModal");
        var buttonFlowAction = component.get("v.buttonFlowAction");
        console.log('RC_FlowButtonController > handleNavigation - flowToLaunch: ' + flowToLaunch + ', showFlowInModal: ' + showFlowInModal + ', buttonFlowAction: ' + buttonFlowAction);
        
        if (flowToLaunch) {
            
            // hide button
            component.set("v.showButton", false);
            
            if (showFlowInModal) {
                helper.openModal(component);
            } else {

                // show flow inline
                component.set("v.showFlow", true);
            
       		    // find the view component (by aura:id) where the flow will be displayed
        	    var flow = component.find('flowComponent');
        
        	    // start the flow by the flow Unique Name
                flow.startFlow(flowToLaunch);
            }
            
        } else if (buttonFlowAction) {
            
            // set 'navigation' attribute that the flow will use to determine flow path
            var buttonClicked = event.getSource().getLocalId();
            component.set('v.navigation', buttonClicked);      
            console.log('RC_FlowButtonController > handleNavigation - clicked: ' + buttonClicked);
            
            // navigate in the flow
            // for example, this does the same thing as the "Next" or "Previous" buttons in the standard flow footer    
            var navigate = component.get("v.navigateFlow");
            if (navigate) {
                navigate(buttonFlowAction);
            }          
        } else {
        	console.log('RC_FlowButtonController > handleNavigation - button not configured to do anything');             
        }
            
   	}, // end handleNavigation
    
	handleStatusChange : function (component, event, helper) {
        
        var status = event.getParam("status");
        console.log('RC_FlowButtonController > handleStatusChange - status: ' + status);   
        
        if(status == "FINISHED") {
            console.log('RC_FlowButtonController > handleStatusChange - hide flow');   

            // show button
            component.set("v.showButton", true);
            
            // hide flow inline
            component.set("v.showFlow", false);
            
            var showFlowInModal = component.get("v.showFlowInModal");
            console.log('RC_FlowButtonController > handleStatusChange - showFlowInModal: ' + showFlowInModal); 
            if (showFlowInModal) {
                helper.closeModal(component);
            }
            
            /**
            // Get the output variables and iterate over them
            var outputVariables = event.getParam("outputVariables");
            var outputVar;
            for(var i = 0; i < outputVariables.length; i++) {
                outputVar = outputVariables[i];
                // Pass the values to the component's attributes
                if(outputVar.name === "accountName") {
                    component.set("v.accountName", outputVar.value);
                } else {
                    component.set("v.numberOfEmployees", outputVar.value);
                }
            }
            **/
        }
    },

    openModal: function(component, event, helper) {
        helper.openModal(component);
    }, 
    
    closeModal: function(component, event, helper) {
        helper.closeModal(component);
    }, // end closeModal  
    
})
Rally.onReady(function(){
    Ext.define('CustomApp', {
        extend: 'Rally.app.App',
        componentCls: 'app',
        
        launch: function() {
            Ext. create('Rally.data.WsapiDataStore',{
                model: 'UserStory',
                autoLoad: true,
                listeners: {
                    load: this._onDataLoaded,
                    scope: this
                }
            });
    },
    
        _onDataLoaded: function(store,data) {
            var records =[];
            Ext.Array.each(data, function (record) {
                records.push({
                    ScheduleState: record.get('ScheduleState'),
                    Name: record.get ('Name'),
                    Tasks: record.get('Tasks').length,
                    Defects: record.get('Defects').length
                    });
            });
            
            this.add({
                xtype:'rallygrid',
                store: Ext.create ('Rally.data.custom.Store', {
                    data: records,
                    pageSize:5
                }),
                columnCfgs: [
                    {
                        text: 'Name', dataIndex: 'Name', flex: 1
                    },
                    {
                        text: 'Schedule State', dataIndex: 'ScheduleState'
                    },
                    {
                        text: 'Tasks', dataIndex: 'Tasks'
                    },
                    {
                        text: 'Defects', dataIndex: 'Defects'
                    }
                    ]
            })
        }
})
});

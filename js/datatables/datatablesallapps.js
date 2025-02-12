$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('page')) {
        var TenantID = searchParams.get('Tenantfilter')
    }
    $('.datatable-1').dataTable(
        {
            language: {
                paginate: {
                    next: '<i class="fas fa-arrow-right"></i>',
                    previous: '<i class="fas fa-arrow-left"></i>'
                }
            },
            "deferRender": true,
            "pageLength": 25,
            responsive: true,
            "ajax": {

                "url": "/api/Listapps?TenantFilter=" + TenantID,
                "dataSrc": "",
            },
            dom: 'fBlrtip',
            buttons: [
                { extend: 'copyHtml5', className: 'btn btn-primary' },
                { extend: 'excelHtml5', className: 'btn btn-primary' },
                { extend: 'csvHtml5', className: 'btn btn-primary' },
                { extend: 'pdfHtml5', className: 'btn btn-primary' },
            ],
            "columns": [
                { "data": "displayName" },
                { "data": "publishingState" },
                { "data": "installCommandLine" },
                { "data": "uninstallCommandLine" },
                {
                    "data": "id",
                    render: function (id, type, row) { return '<a href=index.html?page=EditApp&TenantFilter=' + TenantID + '&ID=' + id + '><i data-bs-toggle="tooltip" data-bs-placement="top" title="Edit App" class="fas fa-cog fa-fw"></i></a><nothing class="APILink">' + '<a href=api/AssignApp?AssignTo=AllUsers&TenantFilter=' + TenantID + '&ID=' + id + '><i data-bs-toggle="tooltip" data-bs-placement="top" title="Assign to all users" class="fas fa-user-friends fa-fw"></i></a>' + '<a href=api/AssignApp?AssignTo=AllDevices&TenantFilter=' + TenantID + '&ID=' + id + '><i data-bs-toggle="tooltip" data-bs-placement="top" title="Assign to all devices" class="fas fa-laptop fa-fw"></i></a>' + '<a href=api/AssignApp?AssignTo=Both&TenantFilter=' + TenantID + '&ID=' + id + '><i data-bs-toggle="tooltip" data-bs-placement="top" title="Assign globally(All devices, all Users)" class="fas fa-globe fa-fw"></i></i></a>' + '<a href=AppReport.html?TenantFilter=' + TenantID + '&ID=' + id + '></nothing>'; }
                }
            ],
            "order": [[0, "asc"]],
        });
    $('.dataTables_paginate').addClass("btn-group datatable-pagination");
    $('.dataTables_paginate > a').wrapInner('<span />');
});
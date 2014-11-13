function AdminView(controller) {
    var config = new Config();

    this.init = function () {
        load()
        addClickHandlers();
    }

    function addClickHandlers() {
        $("#cctray-save").click(saveCctray)
        $("#save-projects").click(saveProjects)
        $("#include-all").click(includeAll)
        $("#exclude-all").click(excludeAll)
    }

    function appendProjects(projects) {
        $("#projects").append("<ul />")
        projects.forEach(function (project) {
            var included = ""
            if (!config.isReady() || config.includesProject(project.name)) {
                included = "included"
            }
            $("#projects ul").append("<li class='" + included + " no-text-selection'>" + project.name + "</li>")
        })
        $("#projects ul li").click(function () {
            $(this).toggleClass("included")
        })
    }

    this.appendProjects = appendProjects

    function load() {
        var settings = config.load()
        $("#cctray-url").val(settings.cctray)
        if (config.hasCctray()) {
            controller.getProjects(appendProjects)
        }
    }

    function saveCctray() {
        config.save({cctray: $("#cctray-url").val()})
        controller.getProjects(appendProjects)
    }

    function saveProjects() {
        var includedProjects = $("#projects ul li.included").map(function (index, element) {
            return element.textContent
        }).toArray()
        controller.saveIncludedProjects(includedProjects)
        window.location.replace("/")
    }

    function includeAll() {
        $("#projects ul li").addClass("included")
    }

    function excludeAll() {
        $("#projects ul li").removeClass("included")
    }
}
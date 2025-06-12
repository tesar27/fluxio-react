import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Grid3X3,
  List,
  Search,
  MapPin,
  User,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "meeting" | "deadline" | "task" | "event";
  priority: "low" | "medium" | "high";
  attendees?: string[];
  project?: string;
  location?: string;
  color: string;
}

interface CalendarViewType {
  type: "month" | "week" | "day" | "agenda";
  label: string;
  icon: React.ReactNode;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<"month" | "week" | "day" | "agenda">(
    "month"
  );
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Mock events data
  const [events, _setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Sprint Planning Meeting",
      description: "Plan the next sprint for Q1 development",
      date: new Date(2024, 11, 28),
      startTime: "09:00",
      endTime: "10:30",
      type: "meeting",
      priority: "high",
      attendees: ["John Doe", "Jane Smith", "Mike Johnson"],
      project: "FluxIO Platform",
      location: "Conference Room A",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Mobile app release candidate",
      date: new Date(2024, 11, 30),
      startTime: "17:00",
      endTime: "17:00",
      type: "deadline",
      priority: "high",
      project: "Mobile App",
      color: "bg-red-500",
    },
    {
      id: "3",
      title: "Design Review",
      description: "Review new dashboard designs",
      date: new Date(2024, 11, 29),
      startTime: "14:00",
      endTime: "15:00",
      type: "meeting",
      priority: "medium",
      attendees: ["Sarah Wilson", "Tom Brown"],
      project: "UI Redesign",
      color: "bg-purple-500",
    },
    {
      id: "4",
      title: "Code Review Session",
      description: "Review backend API changes",
      date: new Date(2024, 11, 27),
      startTime: "11:00",
      endTime: "12:00",
      type: "task",
      priority: "medium",
      project: "Backend APIs",
      color: "bg-green-500",
    },
  ]);

  const calendarViews: CalendarViewType[] = [
    { type: "month", label: "Month", icon: <Grid3X3 className="w-4 h-4" /> },
    { type: "week", label: "Week", icon: <CalendarIcon className="w-4 h-4" /> },
    { type: "day", label: "Day", icon: <Clock className="w-4 h-4" /> },
    { type: "agenda", label: "Agenda", icon: <List className="w-4 h-4" /> },
  ];

  const eventTypes = [
    { value: "all", label: "All Events" },
    { value: "meeting", label: "Meetings" },
    { value: "deadline", label: "Deadlines" },
    { value: "task", label: "Tasks" },
    { value: "event", label: "Events" },
  ];

  // Calendar navigation functions
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);

    switch (viewType) {
      case "month":
        newDate.setMonth(
          currentDate.getMonth() + (direction === "next" ? 1 : -1)
        );
        break;
      case "week":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 7 : -7)
        );
        break;
      case "day":
        newDate.setDate(
          currentDate.getDate() + (direction === "next" ? 1 : -1)
        );
        break;
      default:
        break;
    }

    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get calendar title based on view
  const getCalendarTitle = () => {
    const options: Intl.DateTimeFormatOptions = {};

    switch (viewType) {
      case "month":
        options.month = "long";
        options.year = "numeric";
        break;
      case "week":
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${weekEnd.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      case "day":
        options.weekday = "long";
        options.month = "long";
        options.day = "numeric";
        options.year = "numeric";
        break;
      default:
        options.month = "long";
        options.year = "numeric";
    }

    return currentDate.toLocaleDateString("en-US", options);
  };

  // Generate calendar days for month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month's trailing days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        events: getEventsForDate(prevDate),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDate(date),
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        events: getEventsForDate(nextDate),
      });
    }

    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.toDateString() === date.toDateString() &&
        (filterType === "all" || event.type === filterType)
    );
  };

  // Get filtered events
  const getFilteredEvents = () => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.project?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || event.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // Render month view
  const renderMonthView = () => {
    const days = generateCalendarDays();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-sm font-medium text-center text-gray-500 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                !day.isCurrentMonth ? "bg-gray-50" : ""
              } ${isSelected(day.date) ? "bg-blue-50" : ""}`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div
                className={`text-sm mb-1 ${
                  !day.isCurrentMonth
                    ? "text-gray-400"
                    : isToday(day.date)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-900"
                }`}
              >
                {day.date.getDate()}
              </div>

              {/* Events for this day */}
              <div className="space-y-1">
                {day.events.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`text-xs p-1 rounded text-white truncate ${event.color} cursor-pointer hover:opacity-80`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                  >
                    {event.startTime} {event.title}
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs font-medium text-gray-500">
                    +{day.events.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render agenda view
  const renderAgendaView = () => {
    const filteredEvents = getFilteredEvents();
    const groupedEvents = filteredEvents.reduce((groups, event) => {
      const dateKey = event.date.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
      return groups;
    }, {} as Record<string, CalendarEvent[]>);

    return (
      <div className="bg-white border border-gray-200 rounded-lg">
        {Object.entries(groupedEvents).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No events found matching your criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {Object.entries(groupedEvents)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([dateKey, dayEvents]) => (
                <div key={dateKey} className="p-4">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {new Date(dateKey).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="space-y-2">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:shadow-sm"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${event.color} mr-3 flex-shrink-0`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {event.title}
                            </h4>
                            <span className="ml-2 text-xs text-gray-500">
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          {event.description && (
                            <p className="mt-1 text-sm text-gray-500 truncate">
                              {event.description}
                            </p>
                          )}
                          <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                            {event.project && (
                              <span className="flex items-center">
                                <span className="w-2 h-2 mr-1 bg-gray-300 rounded-full"></span>
                                {event.project}
                              </span>
                            )}
                            {event.attendees && (
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {event.attendees.length}
                              </span>
                            )}
                            {event.location && (
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="mt-1 text-gray-500">
            Manage your schedule and deadlines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg lg:flex-row lg:items-center lg:justify-between">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateDate("prev")}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="p-2 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {getCalendarTitle()}
          </h2>

          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Today
          </button>
        </div>

        {/* View Controls and Filters */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* View Selector */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
            {calendarViews.map((view) => (
              <button
                key={view.type}
                onClick={() => setViewType(view.type)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === view.type
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {view.icon}
                <span className="hidden sm:inline">{view.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      {viewType === "month" ? renderMonthView() : renderAgendaView()}

      {/* Event Details Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedEvent ? "Event Details" : "New Event"}
                </h3>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {selectedEvent ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      {selectedEvent.title}
                    </h4>
                    {selectedEvent.description && (
                      <p className="text-sm text-gray-600">
                        {selectedEvent.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="font-medium">
                        {selectedEvent.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <p className="font-medium">
                        {selectedEvent.startTime} - {selectedEvent.endTime}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <p className="font-medium capitalize">
                        {selectedEvent.type}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Priority:</span>
                      <p
                        className={`font-medium capitalize ${
                          selectedEvent.priority === "high"
                            ? "text-red-600"
                            : selectedEvent.priority === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {selectedEvent.priority}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.project && (
                    <div>
                      <span className="text-sm text-gray-500">Project:</span>
                      <p className="font-medium">{selectedEvent.project}</p>
                    </div>
                  )}

                  {selectedEvent.location && (
                    <div>
                      <span className="text-sm text-gray-500">Location:</span>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                  )}

                  {selectedEvent.attendees &&
                    selectedEvent.attendees.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Attendees:
                        </span>
                        <div className="mt-1 space-y-1">
                          {selectedEvent.attendees.map((attendee, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{attendee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex gap-2 pt-4 border-t">
                    <button className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                      Edit Event
                    </button>
                    <button className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Create new event form would go here...
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                      Create Event
                    </button>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

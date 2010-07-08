﻿namespace Engage.Dnn.Events
{
    using System;
    using System.Globalization;
    using System.Text;
    using System.Web;
    using System.Web.UI;

    using Engage.Dnn.Framework.Templating;
    using Engage.Events;
    using Engage.Templating;

    /// <summary>
    /// A base class for modules which display templated event information
    /// </summary>
    public abstract class TemplatedDisplayModuleBase : ModuleBase
    {
        /// <summary>
        /// Relative path to the folder where the action controls are located in this module
        /// </summary>
        protected readonly string ActionsControlsFolder;

        /// <summary>
        /// Keeps track of whether the current event being processed in <see cref="ProcessCommonTag"/> is an alternating (even number) event
        /// </summary>
        private bool isAlternatingEvent = true;

        /// <summary>
        /// Keeps track of the last event processed in <see cref="ProcessCommonTag"/> to enable alternating behavior
        /// </summary>
        private Event lastEventProcessed;

        /// <summary>
        /// Initializes a new instance of the <see cref="TemplatedDisplayModuleBase"/> class.
        /// </summary>
        protected TemplatedDisplayModuleBase()
        {
            this.ActionsControlsFolder = "~" + this.DesktopModuleFolderName + "Actions/";
        }

        /// <summary>
        /// Processes the tokens that are common between the listing and details views
        /// </summary>
        /// <param name="container">The container into which created controls should be added</param>
        /// <param name="tag">The tag to process</param>
        /// <param name="currentEvent">The current event.</param>
        /// <param name="resourceFile">The resource file to use to find get localized text.</param>
        /// <returns>
        /// Whether to process the tag's ChildTags collection
        /// </returns>
        protected bool ProcessCommonTag(Control container, Tag tag, Event currentEvent, string resourceFile)
        {
            if (currentEvent != null && currentEvent != this.lastEventProcessed)
            {
                this.isAlternatingEvent = !this.isAlternatingEvent;
                this.lastEventProcessed = currentEvent;
            }

            if (tag.TagType == TagType.Open)
            {
                switch (tag.LocalName.ToUpperInvariant())
                {
                    case "EDITEVENTBUTTON":
                        if (this.IsAdmin)
                        {
                            ButtonAction editEventAction = (ButtonAction)this.LoadControl(this.ActionsControlsFolder + "ButtonAction.ascx");
                            editEventAction.CurrentEvent = currentEvent;
                            editEventAction.ModuleConfiguration = this.ModuleConfiguration;
                            editEventAction.Href = this.BuildLinkUrl(this.ModuleId, "EventEdit", Utility.GetEventParameters(currentEvent));
                            editEventAction.ResourceKey = "EditEventButton";
                            container.Controls.Add(editEventAction);
                        }

                        break;
                    case "VIEWRESPONSESBUTTON":
                        if (this.IsAdmin)
                        {
                            ButtonAction responsesEventAction = (ButtonAction)this.LoadControl(this.ActionsControlsFolder + "ButtonAction.ascx");
                            responsesEventAction.CurrentEvent = currentEvent;
                            responsesEventAction.ModuleConfiguration = this.ModuleConfiguration;
                            responsesEventAction.Href = this.BuildLinkUrl(this.ModuleId, "ResponseDetail", Utility.GetEventParameters(currentEvent));
                            responsesEventAction.ResourceKey = "ResponsesButton";
                            container.Controls.Add(responsesEventAction);
                        }

                        break;
                    case "REGISTERBUTTON":

                        // to register must be an event that allows registrations, be active, and have not ended
                        // TODO: add message when event is cancelled, rather than hiding registration button
                        if (currentEvent != null && currentEvent.AllowRegistrations && !currentEvent.Canceled && currentEvent.EventEnd > DateTime.Now)
                        {
                            RegisterAction registerEventAction = (RegisterAction)this.LoadControl(this.ActionsControlsFolder + "RegisterAction.ascx");
                            registerEventAction.CurrentEvent = currentEvent;
                            registerEventAction.ModuleConfiguration = this.ModuleConfiguration;
                            registerEventAction.LocalResourceFile = resourceFile;

                            container.Controls.Add(registerEventAction);
                        }

                        break;
                    case "ADDTOCALENDARBUTTON":

                        // must be an active event and has not ended
                        if (currentEvent != null && !currentEvent.Canceled && currentEvent.EventEnd > DateTime.Now)
                        {
                            AddToCalendarAction addToCalendarAction =
                                (AddToCalendarAction)this.LoadControl(this.ActionsControlsFolder + "AddToCalendarAction.ascx");
                            addToCalendarAction.CurrentEvent = currentEvent;
                            addToCalendarAction.ModuleConfiguration = this.ModuleConfiguration;
                            addToCalendarAction.LocalResourceFile = resourceFile;

                            container.Controls.Add(addToCalendarAction);
                        }

                        break;
                    case "DELETEBUTTON":
                        DeleteAction deleteAction = (DeleteAction)this.LoadControl(this.ActionsControlsFolder + "DeleteAction.ascx");
                        deleteAction.CurrentEvent = currentEvent;
                        deleteAction.ModuleConfiguration = this.ModuleConfiguration;
                        deleteAction.LocalResourceFile = resourceFile;
                        deleteAction.Delete += this.ReturnToList;

                        container.Controls.Add(deleteAction);
                        break;
                    case "CANCELBUTTON":
                        CancelAction cancelAction = (CancelAction)this.LoadControl(this.ActionsControlsFolder + "CancelAction.ascx");
                        cancelAction.CurrentEvent = currentEvent;
                        cancelAction.ModuleConfiguration = this.ModuleConfiguration;
                        cancelAction.LocalResourceFile = resourceFile;
                        cancelAction.Cancel += this.ReloadPage;

                        container.Controls.Add(cancelAction);
                        break;
                    case "EDITEMAILBUTTON":
                        if (this.IsAdmin)
                        {
                            ButtonAction editEmailAction = (ButtonAction)this.LoadControl(this.ActionsControlsFolder + "ButtonAction.ascx");
                            editEmailAction.CurrentEvent = currentEvent;
                            editEmailAction.ModuleConfiguration = this.ModuleConfiguration;
                            editEmailAction.Href = this.BuildLinkUrl(this.ModuleId, "EmailEdit", Utility.GetEventParameters(currentEvent));
                            editEmailAction.ResourceKey = "EditEmailButton";
                            container.Controls.Add(editEmailAction);
                        }

                        break;
                    case "RECURRENCESUMMARY":
                        if (currentEvent != null)
                        {
                            container.Controls.Add(new LiteralControl(Utility.GetRecurrenceSummary(currentEvent.RecurrenceRule)));
                        }

                        break;
                    case "EVENTWRAPPER":
                        if (currentEvent != null)
                        {
                            var cssClass = new StringBuilder(TemplateEngine.GetAttributeValue(tag, currentEvent, resourceFile, "CssClass", "class"));
                            if (currentEvent.IsRecurring)
                            {
                                AppendCssClassAttribute(tag, cssClass, "RecurringEventCssClass");
                            }

                            if (currentEvent.IsFeatured)
                            {
                                AppendCssClassAttribute(tag, cssClass, "FeaturedEventCssClass");
                            }

                            if (currentEvent.Canceled)
                            {
                                AppendCssClassAttribute(tag, cssClass, "CanceledEventCssClass");
                            }

                            if (this.isAlternatingEvent)
                            {
                                AppendCssClassAttribute(tag, cssClass, "AlternatingCssClass");
                            }

                            container.Controls.Add(new LiteralControl(string.Format(CultureInfo.InvariantCulture, "<div class=\"{0}\">", cssClass)));
                        }

                        return true;
                    case "DURATION":
                        if (currentEvent != null)
                        {
                            container.Controls.Add(
                                new LiteralControl(
                                    HttpUtility.HtmlEncode(Utility.GetFormattedEventDate(currentEvent.EventStart, currentEvent.EventEnd))));
                        }

                        break;
                    default:
                        break;
                }
            }
            else if (tag.TagType == TagType.Close)
            {
                switch (tag.LocalName.ToUpperInvariant())
                {
                    case "EVENTWRAPPER":
                        container.Controls.Add(new LiteralControl("</div>"));
                        break;
                    default:
                        break;
                }
            }

            return false;
        }

        /// <summary>
        /// Handles the <see cref="CancelAction.Cancel"/> event, 
        /// reloading the current page to reflect the changes made by those controls
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="args">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected abstract void ReloadPage(object sender, EventArgs args);

        /// <summary>
        /// Handles the <see cref="DeleteAction.Delete"/> event, 
        /// reloading the list of events to reflect the changes made by those controls
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="args">The <see cref="EventArgs"/> instance containing the event data.</param>
        protected abstract void ReturnToList(object sender, EventArgs args);

        /// <summary>
        /// Appends the given attribute to <paramref name="cssClassBuilder"/>, adding a space beforehand if necessary.
        /// </summary>
        /// <param name="tag">The tag whose attribute we are appending.</param>
        /// <param name="cssClassBuilder">The <see cref="StringBuilder"/> which will contain the appended CSS class.</param>
        /// <param name="attributeName">Name of the attribute being appended.</param>
        private static void AppendCssClassAttribute(Tag tag, StringBuilder cssClassBuilder, string attributeName)
        {
            if (cssClassBuilder.Length > 0)
            {
                cssClassBuilder.Append(" ");
            }

            cssClassBuilder.Append(tag.GetAttributeValue(attributeName));
        }
    }
}
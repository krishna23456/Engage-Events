<%@ Control Language="c#" AutoEventWireup="false" Inherits="Engage.Dnn.Events.Controls.RecurrenceEditor" CodeBehind="RecurrenceEditor.ascx.cs" %>
<%@ Register TagPrefix="telerik" Namespace="Telerik.Web.UI" Assembly="Telerik.Web.UI" %>

<li class="eng-form-item eng-events-recurrence-pattern">
    <fieldset>
        <legend><%=Localize("Recurrence")%></legend>
	
        <asp:UpdatePanel runat="server" UpdateMode="Conditional" ChildrenAsTriggers="false" class="rsAdvRecurrencePatterns"><%-- This UpdatePanel needs to include the RecurrenceFrequencyPanel, so that it can update the RepeatFrequencyDaily to postback if it gets reselected.  See http://www.engagesoftware.com/Blog/EntryID/76.aspx --%>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="RepeatFrequencyDaily" />
                <asp:AsyncPostBackTrigger ControlID="RepeatFrequencyWeekly" />
                <asp:AsyncPostBackTrigger ControlID="RepeatFrequencyMonthly" />
                <asp:AsyncPostBackTrigger ControlID="RepeatFrequencyYearly" />
            </Triggers>
            <ContentTemplate>
                <ul class="rsAdvRecurrenceFreq">
                    <li>
                        <asp:RadioButton ID="RepeatFrequencyDaily" runat="server" ResourceKey="Daily" GroupName="RepeatFrequency" AutoPostBack="true" Checked="true" />
                    </li>
                    <li>
                        <asp:RadioButton ID="RepeatFrequencyWeekly" runat="server" ResourceKey="Weekly" GroupName="RepeatFrequency" AutoPostBack="true" />
                    </li>
                    <li>
                        <asp:RadioButton ID="RepeatFrequencyMonthly" runat="server" ResourceKey="Monthly" GroupName="RepeatFrequency" AutoPostBack="true" />
                    </li>
                    <li>
                        <asp:RadioButton ID="RepeatFrequencyYearly" runat="server" ResourceKey="Yearly" GroupName="RepeatFrequency" AutoPostBack="true" />
                    </li>
                </ul>
                <asp:MultiView ID="RecurrencePatternMultiview" runat="server" ActiveViewIndex="0">
                    <asp:View ID="RecurrencePatternDailyView" runat="server">
                        <ul class="rsAdvDaily">
                            <li>
                                <asp:RadioButton ID="RepeatEveryNthDay" runat="server" Checked="true" ResourceKey="Every" GroupName="DailyRecurrenceDetailRadioGroup" />
                                <telerik:RadNumericTextBox ID="DailyRepeatInterval" runat="server" CssClass="rsAdvInput" MinValue="1" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0" />
                                <%=Localize("Days")%>
                            </li>
                            <li>
                                <asp:RadioButton ID="RepeatEveryWeekday" runat="server" Checked="false" ResourceKey="EveryWeekday" GroupName="DailyRecurrenceDetailRadioGroup" />
                            </li>
                        </ul>
                    </asp:View>
                    <asp:View ID="RecurrencePatternWeeklyView" runat="server">
                        <ul class="rsAdvWeekly">
                            <li>
                                <%=Localize("RecurEvery")%>
                                <telerik:RadNumericTextBox ID="WeeklyRepeatInterval" runat="server" CssClass="rsAdvInput" MinValue="1" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                                <%=Localize("Weeks")%>
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdayMonday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdayTuesday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdayWednesday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdayThursday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdayFriday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdaySaturday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                            <li class="rsAdvWeekly_Weekday">
                                <asp:CheckBox ID="WeeklyWeekdaySunday" runat="server" CssClass="rsAdvCheckboxWrapper" />
                            </li>
                        </ul>
                    </asp:View>
                    <asp:View ID="RecurrencePatternMonthlyView" runat="server">
                        <ul class="rsAdvMonthly">
                            <li>
                                <asp:RadioButton ID="RepeatEveryNthMonthOnDate" runat="server" Checked="true" ResourceKey="Day" GroupName="MonthlyRecurrenceRadioGroup" />
                                <telerik:RadNumericTextBox ID="MonthlyRepeatDate" runat="server" CssClass="rsAdvInput" MinValue="1" MaxValue="31" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                                <%=Localize("OfEvery")%>
                                <telerik:RadNumericTextBox ID="MonthlyRepeatIntervalForDate" runat="server" CssClass="rsAdvInput" MinValue="1" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                                <%=Localize("Months")%>
                            </li>
                            <li>
                                <asp:RadioButton ID="RepeatEveryNthMonthOnGivenDay" runat="server" ResourceKey="The" GroupName="MonthlyRecurrenceRadioGroup" />
                                <asp:DropDownList ID="MonthlyDayOrdinalDropDown" runat="server" />
                                <asp:DropDownList ID="MonthlyDayMaskDropDown" runat="server" />
                                <%=Localize("OfEvery")%>
                                <telerik:RadNumericTextBox ID="MonthlyRepeatIntervalForGivenDay" runat="server" CssClass="rsAdvInput" MinValue="1" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                                <%=Localize("Months")%>
                            </li>
                        </ul>
                    </asp:View>
                    <asp:View ID="RecurrencePatternYearlyView" runat="server">
                        <ul class="rsAdvYearly">
                            <li>
                                <asp:RadioButton ID="RepeatEveryYearOnDate" runat="server" Checked="true" ResourceKey="Every" GroupName="YearlyRecurrenceRadioGroup" />
                                <asp:DropDownList ID="YearlyRepeatMonthForDate" runat="server" />
                                <telerik:RadNumericTextBox ID="YearlyRepeatDate" runat="server" CssClass="rsAdvInput" MinValue="1" MaxValue="31" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                            </li>
                            <li>
                                <asp:RadioButton ID="RepeatEveryYearOnGivenDay" runat="server" ResourceKey="The" GroupName="YearlyRecurrenceRadioGroup" />
                                <asp:DropDownList ID="YearlyDayOrdinalDropDown" runat="server" />
                                <asp:DropDownList ID="YearlyDayMaskDropDown" runat="server" />
                                <%=Localize("Of")%>
                                <asp:DropDownList ID="YearlyRepeatMonthForGivenDay" runat="server" />
                            </li>
                        </ul>
                    </asp:View>
                </asp:MultiView>
            </ContentTemplate>
        </asp:UpdatePanel>
    </fieldset>
</li>
<li class="eng-form-item eng-events-recurrence-range">
    <fieldset>    
        <legend><%=Localize("Range")%></legend>
            <ul class="rsAdvRecurrenceRangePanel">
                <li>
                    <asp:RadioButton ID="RepeatIndefinitely" runat="server" ResourceKey="NoEndDate" Checked="true" GroupName="RecurrenceRangeRadioGroup" />
                </li>
                <li>
                    <asp:RadioButton ID="RepeatGivenOccurrences" runat="server" ResourceKey="EndAfter" GroupName="RecurrenceRangeRadioGroup" />
                    <telerik:RadNumericTextBox ID="RangeOccurrences" runat="server" CssClass="rsAdvInput" MinValue="1" ShowSpinButtons="True" Value="1" Width="50px" NumberFormat-AllowRounding="True" NumberFormat-DecimalDigits="0"/>
                    <%=Localize("Occurrences")%>
                </li>
                <li>
                    <asp:RadioButton ID="RepeatUntilGivenDate" runat="server" ResourceKey="EndByThisDate" GroupName="RecurrenceRangeRadioGroup" />
                    <telerik:RadDatePicker ID="RangeEndDate" runat="server" CssClass="rsAdvInput" Width="100" Calendar-ShowRowHeaders="false"/>
                </li>
            </ul>
    </fieldset>    
</li>
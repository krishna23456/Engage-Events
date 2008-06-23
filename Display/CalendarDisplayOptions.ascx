<%@ Control Language="c#" AutoEventWireup="false" Inherits="Engage.Dnn.Events.CalendarDisplayOptions" Codebehind="CustomDisplayOptions.ascx.cs" %>
<%@ Register TagPrefix="dnn" TagName="label" Src="~/controls/labelControl.ascx" %>

<style type="text/css">
    @import url(<%=Engage.Dnn.Events.ModuleBase.ApplicationUrl %><%=Engage.Dnn.Events.ModuleBase.DesktopModuleFolderName %>Module.css);
</style>

<table cellspacing="0" cellpadding="0" border="0" class="SettingsTable">
    <tr>
        <td class="SubHead"><dnn:label id="lblSkin" runat="server" controlname="ddlSkin" text="Select an Skin:" ResourceKey="lblSkin"/></td>
		<td class="NormalTextBox" style="width: 252px" colspan="3"><asp:dropdownlist id="ddlSkin" Runat="server"/></td>
	</tr>
</table>